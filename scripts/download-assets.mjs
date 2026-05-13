// Download taichinh.de Hashnode assets to public/images/
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const ASSETS = [
  // Logos
  ["https://cdn.hashnode.com/res/hashnode/image/upload/v1749805484176/eb935ac1-2eaa-4bb0-9c68-dc4c74a1cbf1.png", "logo-light.png"],
  ["https://cdn.hashnode.com/res/hashnode/image/upload/v1749805486304/01f87b29-5a1d-4659-8c8e-615ad52c0d29.png", "logo-dark.png"],
  // Article thumbnails (in feed order)
  ["https://cdn.hashnode.com/res/hashnode/image/upload/v1746487234347/85f32b0a-26b9-4c9c-8a48-2b7f2c2f9e98.jpeg", "article-01-tuong-lai-con-tre.jpeg"],
  ["https://cdn.hashnode.com/res/hashnode/image/upload/v1746695906092/70dcd451-57ae-4552-9787-4e25eeddb462.jpeg", "article-02-tich-luy-fondspolice.jpeg"],
  ["https://cdn.hashnode.com/res/hashnode/image/upload/v1746304102841/d4084b33-cae5-4640-8671-8e246b7e93a4.jpeg", "article-03-tu-van-chuyen-nghiep.jpeg"],
  ["https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/jnSIb2sfg58/upload/1283c9df9e98cab5128920950ea4b34e.jpeg", "article-04-bauspar.jpeg"],
  ["https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/QqAkoMIN5Jk/upload/d0b0ebcd9801760ea9ad500a32970ac8.jpeg", "article-05-fonds-sparplan.jpeg"],
  ["https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/ymf4_9Y9S_A/upload/6ae53a2db639e2e54d6c77998bdc553b.jpeg", "article-06-huu-tri-doanh-nghiep.jpeg"],
  ["https://cdn.hashnode.com/res/hashnode/image/upload/v1746300549052/1da6d0e5-95a7-4525-bdc7-4dde46458fed.png", "article-07-riester.png"],
  ["https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/FyD3OWBuXnY/upload/063925675c9ec0898de2f91497d27ef4.jpeg", "article-08-bao-hiem-doanh-nghiep.jpeg"],
  ["https://cdn.hashnode.com/res/hashnode/image/upload/v1746704525381/1768d6b7-09c7-4144-b08c-d17ba01c432a.jpeg", "article-09-vang-goldsparplan.jpeg"],
  ["https://cdn.hashnode.com/res/hashnode/image/upload/v1746301640414/f8d8a412-b3ea-463c-80ad-3efbba2626f9.jpeg", "article-10-tin-dung-bat-dong-san.jpeg"],
  ["https://cdn.hashnode.com/res/hashnode/image/upload/v1743337536616/93a39da6-07d5-4c0b-9d55-a84cdbe77e8e.jpeg", "article-11-basisrente.jpeg"],
];

const PUBLIC = new URL("../public/images/", import.meta.url);

async function fetchOne(url, filename) {
  const target = new URL(filename, PUBLIC);
  await mkdir(dirname(target.pathname), { recursive: true });
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(target, buf);
  return { filename, bytes: buf.byteLength };
}

async function pool(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    const settled = await Promise.allSettled(chunk.map(([u, n]) => fetchOne(u, n)));
    settled.forEach((r, j) => {
      if (r.status === "fulfilled") {
        console.log(`✓ ${r.value.filename} (${r.value.bytes} bytes)`);
        out.push(r.value);
      } else {
        console.log(`✗ ${chunk[j][1]}: ${r.reason.message}`);
      }
    });
  }
  return out;
}

const results = await pool(ASSETS, 4);
console.log(`\nDone: ${results.length}/${ASSETS.length} downloaded`);
