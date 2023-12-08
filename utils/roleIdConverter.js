export default function roleIdConverter(roleId) {
    switch (roleId) {
        case 1:
            return 'admin';
        case 2:
            return 'user';
        case 3:
            return 'coach';
        case 4:
            return 'student';
        default:
            return 'user';
    }
}