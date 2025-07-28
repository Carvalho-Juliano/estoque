"use client";

import { deleteCostume } from "@/actions/actions-figurinos";

export default function ButtonDeleteCostume(id: number) {
  return (
    <button
      type="button"
      className="btn btn-danger ms-2"
      onClick={() => deleteCostume(id)}
    >
      Excluir
    </button>
  );
}
