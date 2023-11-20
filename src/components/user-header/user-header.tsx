import { IUser } from "@/backend/domain/User";

type UserHeaderProps = {
  user?: IUser;
};

const UserHeader = ({ user }: UserHeaderProps) => {
  if (!user) return <div></div>;

  const { email, name, url } = user;

  return (
    <header className="flex justify-between items-center mb-10">
      <img
        className="w-40 h-40 object-cover rounded-full"
        src={url}
        alt="img"
      />

      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </header>
  );
};

export { UserHeader };
