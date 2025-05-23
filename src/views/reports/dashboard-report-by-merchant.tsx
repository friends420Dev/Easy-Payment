interface Menu {
    id: number;
    name: string;
    to: string;
    icon: string;
    access: {
        role: string[];
    };
}
type TypeMenu = {
    id: number;
    name: string;
    to: string;
    icon: string;
    access: {
        role: string[];
    };
}
interface User {
    id: number;
    name: string;
    roles: string[];
}

const Index = () => {
    const menus = [
        { id: 1, name: 'Dashboard', icon:"fa fas-user", to: '/dashboard', access: { role: ['admin', 'manager'] } },
        { id: 2, name: 'Reports',icon:"fa fas-reports", to: '/reports', access: { role: ['admin', 'manager'] } },
        // ...
    ];

    const user = {
        id: 1,
        name: 'John Doe',
        roles: ['admin']
    };
    function filterMenusByUser(menus: Menu[], user: User): Menu[] {
        return menus.filter((menu:any) => {
            return menu.access.role.some((role:any) => user.roles.includes(role));
        });
    }
    const accessibleMenus:any = filterMenusByUser(menus, user);
    //console.log(accessibleMenus); 
    return (<>

    </>);
}

export default Index;