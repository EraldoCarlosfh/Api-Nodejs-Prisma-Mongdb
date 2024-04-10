import prismaCliente from "../prisma";

interface CreateUserProps {
  userName: string;
  email: string;
  photoUrl: string;
  password: string;
  count: number;
  isActive: boolean;
}

interface DeleteUserProps {
  id: string;
}

interface GetByEmailUserProps {
  email: string;
  password: string;
}

class UserService {
  async getUsers() {
    try {
      const response = await prismaCliente.user.findMany();
      return response;
    } catch (error: any) {
      throw error.message;
    } finally {
      await prismaCliente.$disconnect();
    }
  }

  async getUserLogin({ email, password }: GetByEmailUserProps) {
    try {
      const response = await prismaCliente.user.findFirst({
        where: {
          email: email,
        },
      });

      if (response) {
        if (response.password == password)
          return response;
        else
          return new Error("Senha incorreta, sua senha está errada.");
      } else {
        return new Error("Não existe usuário com o e-mail informado.");
      }

    } catch (error: any) {
      throw error.message;
    } finally {
      await prismaCliente.$disconnect();
    }
  }

  async getUserById({ id }: DeleteUserProps) {
    try {
      const response = await prismaCliente.user.findFirst({
        where: {
          id: id,
        },
      });

      if (response) {
        return response;
      } else {
        return new Error("Não existe usuário com o e-mail informado.");
      }

    } catch (error: any) {
      throw error.message;
    } finally {
      await prismaCliente.$disconnect();
    }
  }

  async deleteUserById({ id }: DeleteUserProps) {
    try {
      const response = await prismaCliente.user.findFirst({
        where: {
          id: id,
        },
      });

      if (response) {
        await prismaCliente.user.delete({
          where: {
            id: response.id,
          },
        });

        return { message: "Usuário deletado com sucesso." };
      } else return new Error("Não existe usuário com o id informado.");

    } catch (error: any) {
      throw error.message;
    } finally {
      await prismaCliente.$disconnect();
    }
  }

  async postUser({
    userName,
    email,
    photoUrl,
    password,
    count,
    isActive,
  }: CreateUserProps) {
    try {

      const user = await prismaCliente.user.findFirst({
        where: {
          email: email,
        },
      });

      if (user)
        return new Error("E-mail já cadastrado no sistema."); 

      const response = await prismaCliente.user.create({
        data: {
          userName,
          email,
          photoUrl,
          password,
          count,
          isActive,
        },
      });
      return response;
    } catch (error: any) {
      throw error.message;
    } finally {
      await prismaCliente.$disconnect();
    }
  }

  async putUser({ id }: DeleteUserProps) {
    try {

      const response = await prismaCliente.user.findFirst({
        where: {
          id: id,
        },
      });

      if (response) {
        await prismaCliente.user.update({
          data: {            
            count: response.count - 1,
          },
          where: {
            id: response.id
          }
        });

        const user = await prismaCliente.user.findFirst({
          where: {
            id: id,
          },
        });
   
        return user;
      } else return new Error("Não existe usuário com o id informado.");

    } catch (error: any) {
      throw error.message;
    } finally {
      await prismaCliente.$disconnect();
    }
  }
}

export { UserService };
