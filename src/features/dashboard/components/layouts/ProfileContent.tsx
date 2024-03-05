import { Profile } from "../../types/Profile";

export const ProfileContent = ({ name }: Profile) => {
  return (
    <div>
      <div>{name}</div>
    </div>
  );
};
