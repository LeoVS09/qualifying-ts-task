import { grabLinks, grabPaginationLinks, search } from "./index";

const samples = {};

describe("Search engine", () => {
  test("Grab links from github", async () => {
    const links = await grabLinks("https://github.com/griddb/griddb_nosql", [
      ".markdown-body.entry-content li a"
    ]);

    expect(links).toContain("https://github.com/griddb/griddb_client");
  });

  test("Grab links from habr", async () => {
    const links = await grabLinks(
      "https://habr.com/flows/develop/top/yearly/",
      [".post__text.post__text-html.js-mediator-article a"]
    );

    expect(links).toContain("http://frdocheck.obrnadzor.gov.ru/");
    expect(links).not.toContain("https://habr.com/post/347760/");
  });

  test("Search links with pagination", async () => {
    const links = await grabLinks("https://github.com/griddb/griddb_nosql", [
      ".mw-search-result-heading a"
    ]);

    expect(links).toContain(
      "https://ru.wikipedia.org/wiki/%D0%A0%D0%BE%D0%BC%D0%B5%D0%BE_%D0%B8_%D0%94%D0%B6%D1%83%D0%BB%D1%8C%D0%B5%D1%82%D1%82%D0%B0"
    );
  });
});

describe("Intermediate level suit", () => {
  test("Search page containing text", async () => {
    const pages = await search(
      "https://ru.wikipedia.org/wiki/%D0%94%D0%B0%D0%BD%D1%82%D0%B5_%D0%90%D0%BB%D0%B8%D0%B3%D1%8C%D0%B5%D1%80%D0%B8",
      "сосредоточиться на управлении своим новым австрийским герцогством"
    );

    const links = pages.map(p => p.url);

    expect(links).toContain(
      "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%8C%D0%B1%D1%80%D0%B5%D1%85%D1%82_I_(%D0%BA%D0%BE%D1%80%D0%BE%D0%BB%D1%8C_%D0%93%D0%B5%D1%80%D0%BC%D0%B0%D0%BD%D0%B8%D0%B8)"
    );
    expect(links).not.toContain(
      "https://ru.wikipedia.org/wiki/%D0%A0%D1%83%D0%B4%D0%BE%D0%BB%D1%8C%D1%84_II_(%D0%B3%D0%B5%D1%80%D1%86%D0%BE%D0%B3_%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B8%D0%B8)"
    );
  });

  test("Get data from searching page", async () => {
    const pages = await search(
      "https://ru.wikipedia.org/wiki/%D0%9B%D0%B5%D0%BE%D0%BD%D0%B0%D1%80%D0%B4%D0%BE_%D0%B4%D0%B0_%D0%92%D0%B8%D0%BD%D1%87%D0%B8",
      "расстояние между двумя плоскостями",
      {
        subHeaders: "h3 .mw-headline"
      }
    );

    const pagesSubHeaders = pages
      .map(p => p.data.subHeaders)
      .reduce((result, data) => result.push(...data), []);

    expect(pagesSubHeaders).toContain("Обратной стреловидности");
  });
});
