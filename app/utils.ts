export type QueryParams = {
  page?: number;
  limit?: number;
  order?: "relevance" | "recent";
  term?: string;
  filters?: {
    orientation?: {
      landscape?: number;
      portrait?: number;
      square?: number;
      panoramic?: number;
    };
    content_type?: {
      photo?: number;
      psd?: number;
      vector?: number;
    };
    license?: {
      freemium?: number;
      premium?: number;
    };
    people?: {
      include?: number;
      exclude?: number;
      number?: "1" | "2" | "3" | "more_than_three";
      age?:
        | "infant"
        | "child"
        | "teen"
        | "young-adult"
        | "adult"
        | "senior"
        | "elder";
      gender?: "male" | "female";
      ethnicity?:
        | "south-asian"
        | "middle-eastern"
        | "east-asian"
        | "black"
        | "hispanic"
        | "indian"
        | "white"
        | "multiracial";
    };
    period?: "last-month" | "last-quarter" | "last-semester" | "last-year";
    color?:
      | "black"
      | "blue"
      | "gray"
      | "green"
      | "orange"
      | "red"
      | "white"
      | "yellow"
      | "purple"
      | "cyan"
      | "pink";
    author?: number;
    ai_generated?: {
      excluded?: number;
      only?: number;
    };
    vector?: {
      type?: "jpg" | "ai" | "eps" | "svg";
      style?:
        | "watercolor"
        | "flat"
        | "cartoon"
        | "geometric"
        | "gradient"
        | "isometric"
        | "3d"
        | "hand-drawn";
    };
    psd?: {
      type?: "jpg" | "psd";
    };
    ids?: string;
  };
};

export function generateQueryParams(params: QueryParams): string {
  const searchParams = new URLSearchParams();

  // Establecer valores por defecto
  const term = params.term;
  const page = params.page ?? 1;
  const limit = params.limit ?? 50;
  const freemium = params.filters?.license?.freemium ?? 1;
  const photo = params.filters?.content_type?.photo ?? 1;

  if (term) {
    searchParams.append("term", term);
  }
  searchParams.append("page", page.toString());
  searchParams.append("limit", limit.toString());
  searchParams.append("filters[license][freemium]", freemium.toString());
  searchParams.append("filters[content_type][photo]", photo.toString());

  Object.entries(params).forEach(([key, value]) => {
    if (
      key !== "term" &&
      key !== "page" &&
      key !== "limit" &&
      value !== undefined &&
      value !== ""
    ) {
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue !== undefined && subValue !== "") {
            if (typeof subValue === "object" && subValue !== null) {
              Object.entries(subValue).forEach(([nestedKey, nestedValue]) => {
                if (
                  nestedValue !== undefined &&
                  nestedValue !== "" &&
                  nestedKey !== "photo" &&
                  nestedKey !== "freemium"
                ) {
                  searchParams.append(
                    `filters[${subKey}][${nestedKey}]`,
                    nestedValue.toString()
                  );
                }
              });
            } else {
              searchParams.append(
                `filters[${key}][${subKey}]`,
                subValue.toString()
              );
            }
          }
        });
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  return `?${searchParams.toString()}`;
}

export const getFormattedNumber = (number: number) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(number);

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
