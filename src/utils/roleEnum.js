export default class RoleEnum {
    static Student = new RoleEnum("学生")
    static Teacher = new RoleEnum("老师")
    static Nobody = new RoleEnum("未知角色")

    constructor(value) {
        this.value = value
    }

    static getInstance(roleSymbol){
        switch (roleSymbol) {
            case 1:
                return RoleEnum.Student
            case 0:
                return RoleEnum.Teacher
            default:
                return RoleEnum.Nobody
        }
    }
}
