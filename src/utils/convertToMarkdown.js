import { remark } from "remark";
import html from "remark-html";

export async function convertToMarkdown(text) {
  const result = await remark().use(html).process(text);
  return result.toString();
}
