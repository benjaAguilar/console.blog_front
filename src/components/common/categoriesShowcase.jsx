import { useEffect, useState } from "react";
import { fetchData } from "../../utils/utils";
import { CategoriesLoading } from "./loading/CategoriesLoading";

export function CategoriesShowcase() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function getCategories() {
      const categories = await fetchData("/api/categories", "GET");

      if (categories.success) {
        setCategories(categories.categories);
      }
    }

    //to test loading, replace soon
    setTimeout(getCategories, 5000);
  }, []);

  return (
    <div>
      <h3 className="text-lg mb-2">Categorias</h3>
      <nav className="flex items-center gap-4 w-full overflow-x-auto">
        {categories ? (
          categories.map((category) => {
            return (
              <a
                key={category.id}
                href=""
                className="bg-amber-500 bg-opacity-40 rounded-2xl pl-4 pr-4 hover:bg-opacity-60"
              >
                {category.name}
              </a>
            );
          })
        ) : (
          <CategoriesLoading />
        )}
      </nav>
    </div>
  );
}
