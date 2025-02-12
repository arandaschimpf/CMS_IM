import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import MainNav from '@/components/MainNav';

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Avatar>
            <AvatarFallback className="bg-black text-white">Ez</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
