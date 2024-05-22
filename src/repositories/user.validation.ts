// validation.ts
import { UserEntity } from "./user.interface";

export function isValidUserEntity(data: any): data is UserEntity {
  return (
    typeof data.name === "string" &&
    typeof data.dateofBirth === "string" &&
    typeof data.email === "string" &&
    typeof data.pass === "string"
  );
}
