import Users from "./users.json";
import Albums from "./albums.json";

export const RIEN_TROUVE_TXT = "Désolé, rien est trouvé";
export const INVALIDE_ARGUMENT = "INVALIDE_ARGUMENT";
export const USER_NOT_EXIST = "USER_NOT_EXIST";
export const ALBUM_NOT_EXIST = "ALBUM_NOT_EXIST";

/**
 * Renvoyer Users ou un seul User, ça dependen si le id est donné
 * @param {?number}  id - Param 'id', mais peut-être nullable
 * @returns {(Object[] || Object)}
 */
export function getAllUsers(id) {
  if (id === undefined) return Users;
  const user = Users.find((user) => user.id === id);
  return user || RIEN_TROUVE_TXT;
}

/**
 * Renvoyer Albums ou un seul Album, ça dependen si le id est donné
 * @param {?number}  id - Param 'id', mais peut-être nullable
 * @returns {(Object[] | Object)} res
 */
export function getAllAlbums(id) {
  if (id === undefined) return Albums;
  const album = Albums.find((album) => album.id === id);
  return album || RIEN_TROUVE_TXT;
}

/**
 * Pour verifier il exist vraiment ca User dans la table de Users
 * Suppons que on peut chercher un User par 'id', 'name', 'username', 'email', 'phone'
 * @param {(!Object | !string)}  userOrIserId
 * @returns {string} albums
 */
function ckeckUserExist(userOruserId) {
  // si le paramètre est une chaine des caractères
  if (typeof userOruserId === "number") {
    if (!userOruserId) throw new Error(INVALIDE_ARGUMENT);
    for (const user of Users) {
      if (user.id === userOruserId) return userOruserId;
    }
    throw new Error(USER_NOT_EXIST);
  }

  // si le paramètre est un object
  // on suppose que ces clés peuvent nous aider confirmer le 'User' unique
  const UserIndexKeys = ["id", "name", "username", "email", "phone"];
  for (const Key of UserIndexKeys) {
    const idx = userOruserId[Key];
    const ele = Users.find((ele) => ele[Key] === idx);
    if (ele) {
      return ele.id;
    }
  }
  throw new Error(USER_NOT_EXIST);
}

/**
 * Renvoyer tous les albums selon le user ou userId
 * Suppons que on peut chercher un User par 'id', 'name', 'username', 'email', 'phone'
 * @param {(!Object | !string)}  userOrIserId
 * @returns {Object[]} albums
 */
export function getAlbumsByUser(userOruserId) {
  // Premiere chose est à vérifier le type d'argument 'user', il faut être 'Object' ou 'string'
  if (!["object", "string"].includes(typeof userOruserId))
    throw new Error(INVALIDE_ARGUMENT);
  // 2 On dois trouver le User ciblé à verifier il exist vraiment ca User dans la table de Users
  const userId = ckeckUserExist(userOruserId);
  // Finallement, on peut filter les albums par `userId`
  return Albums.filter((album) => album.userId === userId);
}

/**
 * Renvoyer tous les titlres selon le Object `album` ou string `albumId`
 * @param {(!Object | !string)}  albumOrAlbumId
 * @returns {string[]} albums
 */
export function getTitlesByAlbum(albumOrAlbumId) {
  if (!["object", "number"].includes(typeof albumOrAlbumId))
    throw new Error(INVALIDE_ARGUMENT);
  const albumId =
    typeof albumOrAlbumId === "number" ? albumOrAlbumId : albumOrAlbumId.id;
  const filteredAlbums = Albums.filter((album) => album.id === albumId);
  if (!filteredAlbums.length) throw new Error(ALBUM_NOT_EXIST);
  return filteredAlbums.map((album) => album.title);
}

/**
 * Renvoyer 'userId' unique
 * @returns {number[]}
 */
export function getUniqueUserIds() {
  const nonUniqueUserIds = Albums.map((album) => album.userId);
  const uniqueIdSet = new Set(nonUniqueUserIds);
  return Array.from(uniqueIdSet);
}
