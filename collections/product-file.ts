import { User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};

const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (user?.role === "admin") return true;
  if (!user) return false;

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFileIds = products.map((prod) => prod.product_files).flat();

  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductFileIds = orders.map((order) => {
    return order.products.map((product) => {
      if (typeof product === "string")
        return req.payload.logger.error(
          "Search depth not sufficient to find purchased file IDs"
        );

      return typeof product.product_files === "string"
        ? product.product_files
        : product.product_files.id;
    })
  })
  .filter(Boolean)
  .flat()

  return {
    id: {
      in: [...ownProductFileIds, ...purchasedProductFileIds]
    }
  }
};

export const ProductFile: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: yourOwnAndPurchased,
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: [
      "image/*",
      "font/*",
      "application/postscript",
      ".tsx",
      ".ts",
      ".cts",
      ".mts",
      ".js",
      ".cjs",
      ".mjs",
      ".jsx",
      ".c",
      ".cpp",
      ".cc",
      ".cxx",
      ".hpp",
      ".h",
      ".hh",
      ".hxx",
      ".hxx",
      ".rs",
      ".prisma",
      ".ps1",
      ".psm1",
      ".psd1",
      ".pssc",
      ".psrc",
      ".java",
      ".kotlin",
      ".sql",
      ".i",
      ".cmake",
      ".cs",
      ".csx",
      ".cake",
      ".json",
      ".html",
      ".htm",
      ".css",
      ".css.map",
      ".js.map",
      ".dart",
      ".go",
      ".dockerfile",
      ".containerfile",
      ".graphql",
      ".groovy",
      ".gvy",
      ".gradle",
      ".gradle.kts",
      ".kts",
      ".xml",
      ".bat",
      ".properties",
      ".jar",
      ".md",
      ".mdx",
      ".gitignore",
      ".config.js",
      ".php",
      ".m",
      ".swift",
      ".rb",
      ".rbx",
      ".rjs",
      ".r",
      ".py",
      ".sh",
      ".bash",
      ".bashrc",
      ".bash_profile",
      ".gz",
      ".pack.gz",
      ".pack.gz.old",
      ".gz.old",
      ".pack.gz_",
      ".gz_",
      ".sh",
      ".scss",
    ],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
  ],
};
