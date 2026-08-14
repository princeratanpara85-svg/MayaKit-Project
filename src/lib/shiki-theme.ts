import { ThemeRegistration } from "shiki";

export const mayakitTheme: ThemeRegistration = {
  name: "mayakit-dark",
  type: "dark",
  colors: {
    "editor.background": "#163648",
    "editor.foreground": "#E2E8F0",
  },
  settings: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#E2E8F066",
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "variable.language",
        "keyword.control",
        "keyword.operator.new",
        "keyword.operator.expression",
      ],
      settings: {
        foreground: "#FFFE15",
      },
    },
    {
      scope: ["string", "string.template", "punctuation.definition.string"],
      settings: {
        foreground: "#E2E8F099",
      },
    },
    {
      scope: ["entity.name.function", "support.function", "entity.name.type.class"],
      settings: {
        foreground: "#E2E8F0",
        fontStyle: "bold",
      },
    },
    {
      scope: ["variable", "variable.parameter", "variable.other"],
      settings: {
        foreground: "#E2E8F0",
      },
    },
    {
      scope: ["punctuation", "meta.brace", "meta.delimiter"],
      settings: {
        foreground: "#E2E8F099",
      },
    },
    {
      scope: ["entity.name.tag", "support.class.component"],
      settings: {
        foreground: "#FFFE15",
      },
    },
  ],
};
