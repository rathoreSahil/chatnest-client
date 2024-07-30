import ProfilePhoto from "@/components/profile/profile-photo";

type UserListItemProps = {
  user: User;
};

const UserListItem = ({ user }: UserListItemProps) => {
  return (
    <div
      onClick={() => handleClick(user)}
      className="p-4 cursor-pointer flex gap-4 items-center"
    >
      <ProfilePhoto src={user.photo} />
      <div>
        <p>{user.name}</p>
        <p className="opacity-50 text-sm italic">{user.description}</p>
      </div>
    </div>
  );
};

export default UserListItem;
