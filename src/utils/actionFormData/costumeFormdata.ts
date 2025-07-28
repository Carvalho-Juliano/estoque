export async function sendCostumeData(
  method: "POST" | "PUT",
  url: string,
  formData: FormData
) {
  const body = {
    description: String(formData.get("description")),
    quantity: Number(formData.get("quantity")),
    size: String(formData.get("size")),
    available_quantity: Number(formData.get("available_quantity")),
  };

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res;
}
