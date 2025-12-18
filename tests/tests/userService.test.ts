import prisma from "../__mocks__/prisma";
import * as userService from "../../src/modules/user/userService";

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllUsers retourne la liste des utilisateurs", async () => {
    prisma.user.findMany.mockResolvedValue([
      {
        id: 1,
        nom: "Ayad",
        prenom: "Anwar",
        dateNaissance: new Date(),
        adresse: "",
        telephone: "",
        email: "",
        password: "",
        isDeleted: false,
        role: null,
        candidat: null,
        etudiant: null,
        employe: null,
        parent: null,
      },
      {
        id: 2,
        nom: "Anwar",
        prenom: "Ayad",
        dateNaissance: new Date(),
        adresse: "",
        telephone: "",
        email: "",
        password: "",
        isDeleted: false,
        role: null,
        candidat: null,
        etudiant: null,
        employe: null,
        parent: null,
      },
    ]);

    const result = await userService.getAllUsers();

    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(result.length).toBe(2);
  });

  test("createUser crée un utilisateur", async () => {
    const fakeUser = {
      id: 1,
      nom: "Anwar",
      prenom: "Ayad",
      dateNaissance: new Date("2000-01-01"),
      adresse: "123 rue Exemple",
      telephone: "0600000000",
      email: "test@test.com",
      password: "password123",
      isDeleted: false,
      role: null,
      candidat: null,
      etudiant: null,
      employe: null,
      parent: null,
    };

    prisma.user.create.mockResolvedValue(fakeUser);

    const result = await userService.createUser({
      nom: "Anwar",
      prenom: "Ayad",
      dateNaissance: new Date("2000-01-01"),
      adresse: "123 rue Exemple",
      telephone: "0600000000",
      email: "test@test.com",
      password: "password123",
    });

    expect(prisma.user.create).toHaveBeenCalled();
    expect(result).toEqual(fakeUser);
  });

  test("getUserById retourne un user par id", async () => {
    const fakeUser = {
      id: 1,
      nom: "Test",
      prenom: "User",
      dateNaissance: new Date(),
      adresse: "",
      telephone: "",
      email: "",
      password: "",
      isDeleted: false,
      role: null,
      candidat: null,
      etudiant: null,
      employe: null,
      parent: null,
    };

    prisma.user.findUnique.mockResolvedValue(fakeUser);

    const result = await userService.getUserById(1);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        role: true,
        candidat: true,
        etudiant: true,
        employe: true,
        parent: true,
      },
    });
    expect(result?.id).toBe(1);
  });
});
