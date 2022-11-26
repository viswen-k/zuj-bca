import { Model } from 'sequelize';

export default class CrudModel extends Model {
  [index: string]: any;

  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static primary_key?: string;
}
