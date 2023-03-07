import {
  getAllUsers,
  getAllAlbums,
  getAlbumsByUser,
  getUniqueUserIds,
  getTitlesByAlbum,
  RIEN_TROUVE_TXT,
  INVALIDE_ARGUMENT,
  USER_NOT_EXIST,
  ALBUM_NOT_EXIST
} from "./main.js";
import Users from "./users.json";
import Albums from "./albums.json";

describe("les tests de getAllUsers", () => {
  it("si le id n'est pas donné, la fonctione doit renvoyer tous les élements", () => {
    const res = getAllUsers();
    expect(res.length).toBe(Users.length);
  });

  it("si le id est donné, la fonctione doit renvoyer une seule élements", () => {
    const TargetId = 1;
    const targetEle = Users.find((user) => user.id === TargetId);
    const res = getAllUsers(TargetId);
    expect(res).toEqual(targetEle);
  });

  it("si le id est donné mais invalid, la fonctione doit renvoyer une chaine des caractères indiquant rien n'est trouvé", () => {
    const TargetId = -1;
    const res = getAllUsers(TargetId);
    expect(res).toMatch(RIEN_TROUVE_TXT);
  });
});

describe("les tests de getAllAlbums", () => {
  it("si le id n'est pas donné, la fonctione doit renvoyer tous les élements", () => {
    const res = getAllAlbums();
    expect(res.length).toBe(Albums.length);
  });

  it("si le id est donné, la fonctione doit renvoyer une seule élements", () => {
    const TargetId = 1;
    const targetEle = Albums.find((album) => album.id === TargetId);
    const res = getAllAlbums(TargetId);
    expect(res).toEqual(targetEle);
  });

  it("si le id est donné mais invalid, la fonctione doit renvoyer une chaine des caractères indiquant rien n'est trouvé", () => {
    const TargetId = -1;
    const res = getAllAlbums(TargetId);
    expect(res).toMatch(RIEN_TROUVE_TXT);
  });
});

describe("les tests de getAlbumsByUser", () => {
  it("si le user n'est pas donné, la fonctione doit produire une erreur", () => {
    try {
      getAlbumsByUser();
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toMatch(INVALIDE_ARGUMENT);
    }
  });

  it("si le user n'existe plus, la fonctione doit produire une erreur", () => {
    try {
      getAlbumsByUser({ id: -1 });
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toMatch(USER_NOT_EXIST);
    }
  });

  it("si user est donné et ce user vraiment existe, la fonctione doit renvoyer les élements", () => {
    const TargetId = 1;
    const targetUser = Users.find((user) => user.id === TargetId);
    const rightAlbums = Albums.filter(
      (album) => album.userId === targetUser.id
    );
    const res = getAlbumsByUser(targetUser);
    expect(res.length).toEqual(rightAlbums.length);
    for (const album of rightAlbums) {
      expect(res).toContainEqual(album);
    }
  });
});

describe("les tests de getTitlesByAlbum", () => {
  it("si le parametre n'est pas donné, la fonctione doit produire une erreur", () => {
    try {
      getTitlesByAlbum();
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toMatch(INVALIDE_ARGUMENT);
    }
  });

  it("si le album n'existe plus, la fonctione doit produire une erreur", () => {
    try {
      getTitlesByAlbum({ id: -1 });
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toMatch(ALBUM_NOT_EXIST);
    }
  });

  it("si album est donné et ce album vraiment existe, la fonctione doit renvoyer les titres", () => {
    const TargetId = 1;
    const rightTitles = Albums.filter((album) => album.id === TargetId).map(
      (album) => album.title
    );
    const res = getTitlesByAlbum(TargetId);
    expect(res.length).toEqual(rightTitles.length);
    for (const title of rightTitles) {
      expect(res).toContain(title);
    }
  });
});

describe("les tests de getUniqueUserIds", () => {
  const uniqueUserids = new Array(10).fill(undefined).map((_, idx) => idx + 1);
  it("la taille de résultat doit être 10, y compris les nombres de 1 à 10 et chaque élement doit être seule", () => {
    const res = getUniqueUserIds();
    expect(res.length).toEqual(uniqueUserids.length);
    for (const nom of uniqueUserids) expect(res).toContain(nom);
    const obj = {};
    for (const ele of res) {
      if (ele in obj) {
        expect(true).toBeFalsy();
        break;
      }
      obj[ele] = true;
    }
  });
});
