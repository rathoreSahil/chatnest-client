import ProfilePhoto from "@/components/profile/profile-photo";

type UserListItemProps = {
  user: User;
  handleClick: (user: User) => void;
};

const UserListItem = ({ user, handleClick }: UserListItemProps) => {
  return (
    <div
      onClick={() => handleClick(user)}
      className="px-4 py-3 cursor-pointer flex gap-4 items-center hover:bg-gray-100"
    >
      <ProfilePhoto src={user.photo} />
      <div>
        <p>{user.name}</p>
        <p className="opacity-60 text-sm italic">{user.description}</p>
      </div>
    </div>
  );
};

export default UserListItem;
