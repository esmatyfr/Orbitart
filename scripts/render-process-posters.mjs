// Offline, deterministic diagrams from our A1 geometry, not scan measurements.
// Uses Three already in the project and Next's existing Sharp dependency.
import { readFile, writeFile } from "node:fs/promises";
import { Box3, Mesh, OrthographicCamera, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const bytes = await readFile(new URL("public/models/showcase/a1-orbit-gear.glb", root));
const { scene } = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), "");
scene.updateMatrixWorld(true);
const box = new Box3().setFromObject(scene);
const center = box.getCenter(new Vector3());
const size = box.getSize(new Vector3()).length() * 0.42;
const camera = new OrthographicCamera(-size, size, size, -size, 0.01, size * 20);
camera.position.copy(center).add(new Vector3(2, 5, 4).normalize().multiplyScalar(size * 5));
camera.lookAt(center);
camera.updateMatrixWorld(true);
const light = new Vector3(-2, 5, 4).normalize();
const triangles = [];
scene.traverse(object => {
  if (!(object instanceof Mesh)) return;
  const { geometry } = object;
  const position = geometry.getAttribute("position");
  const count = geometry.index?.count ?? position.count;
  for (let i = 0; i < count; i += 3) {
    const vertices = [0, 1, 2].map(offset => new Vector3().fromBufferAttribute(position, geometry.index ? geometry.index.getX(i + offset) : i + offset).applyMatrix4(object.matrixWorld));
    const normal = vertices[1].clone().sub(vertices[0]).cross(vertices[2].clone().sub(vertices[0])).normalize();
    const centroid = vertices.reduce((sum, point) => sum.add(point), new Vector3()).divideScalar(3);
    if (normal.dot(camera.position.clone().sub(centroid)) < 0) continue;
    const projected = vertices.map(point => point.clone().project(camera));
    const points = projected.map(point => `${((point.x + 1) * 256).toFixed(2)},${((1 - point.y) * 256).toFixed(2)}`).join(" ");
    const shade = Math.round(85 + Math.max(0, normal.dot(light)) * 125);
    triangles.push({ points, projected, shade, depth: centroid.clone().applyMatrix4(camera.matrixWorldInverse).z });
  }
});
triangles.sort((a, b) => a.depth - b.depth);
const surface = triangles.map(({ points, shade }) => `<polygon points="${points}" fill="rgb(${shade},${shade + 3},${shade + 8})" stroke="rgb(${shade},${shade + 3},${shade + 8})" stroke-width="0.65"/>`).join("");
const silhouette = triangles.map(({ points }) => `<polygon points="${points}"/>`).join("");
const wire = triangles.map(({ points }) => `<polygon points="${points}" fill="#181522" stroke="#ab97ce" stroke-width="0.42"/>`).join("");
// Deterministic barycentric samples stay on actual front-facing triangles.
const dots = triangles.filter((_, index) => index % 2 === 0).map(({ projected }, index) => {
  const u = ((index * 31) % 97) / 97;
  const v = (1 - u) * (((index * 17) % 89) / 89);
  const point = projected[0].clone().multiplyScalar(u).addScaledVector(projected[1], v).addScaledVector(projected[2], 1 - u - v);
  return `<circle cx="${((point.x + 1) * 256).toFixed(2)}" cy="${((1 - point.y) * 256).toFixed(2)}" r="1.1" fill="#c4b5fd"/>`;
}).join("");
const variants = {
  sample: surface,
  scan: dots,
  model: wire,
};
// Printing/production posters come from the Blender printer source. Keep them intact here.
for (const [name, content] of Object.entries(variants)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><defs><clipPath id="part">${silhouette}</clipPath><radialGradient id="back"><stop stop-color="#292035"/><stop offset="1" stop-color="#100e18"/></radialGradient></defs><rect width="512" height="512" fill="url(#back)"/>${content}</svg>`;
  const result = await sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer();
  await writeFile(new URL(`public/images/showcase/process-${name}.webp`, root), result);
  console.log(`process-${name}.webp: ${result.length} bytes`);
}
