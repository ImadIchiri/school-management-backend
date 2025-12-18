import * as userController from "../../src/modules/user/userController";
import * as userService from "../../src/modules/user/userService";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("User Controller", () => {
  test("getAllUsers doit retourner 200 + liste users", async () => {
    const req: any = {};
    const res = mockResponse();

    jest.spyOn(userService, "getAllUsers").mockResolvedValue([
      {
        id: 1,
        nom: "Ayad",
        prenom: "Anwar",
        dateNaissance: new Date("2000-01-01"),
        adresse: "123 rue Exemple",
        telephone: "0600000000",
        email: "ayad@test.com",
        password: "password123",
        isDeleted: false,
        role: null,
        candidat: null,
        etudiant: null,
        employe: null,
        parent: null,
      } as any,
    ]);

    await userController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [
        {
          id: 1,
          nom: "Ayad",
          prenom: "Anwar",
          dateNaissance: new Date("2000-01-01"),
          adresse: "123 rue Exemple",
          telephone: "0600000000",
          email: "ayad@test.com",
          password: "password123",
          isDeleted: false,
          role: null,
          candidat: null,
          etudiant: null,
          employe: null,
          parent: null,
        },
      ],
      length: 1,
    });
  });

  test("getUserById retourne 404 si user non trouvé", async () => {
    const req: any = { params: { userId: "555555555" } };
    const res = mockResponse();

    jest.spyOn(userService, "getUserById").mockResolvedValue(null as any);

    await userController.getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No user found for the Id: 555555555",
    });
  });
});
