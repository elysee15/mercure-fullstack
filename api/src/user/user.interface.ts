export interface User extends Document {
  readonly name: string;
  readonly password: string;
}
