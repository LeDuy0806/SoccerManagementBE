import { SCHEMA, Table } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { ITable } from '@/interfaces';
import { ObjectId } from 'mongodb';
@Service()
export class TableService {
  public async getTables(): Promise<ITable[]> {
    try {
      const tables = await Table.find()
        .populate({
          path: 'teams',
          populate: {
            path: 'coach',
            model: SCHEMA.COACH,
          },
        })
        .exec();
      if (!tables) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `tables not found`);
      }
      return tables;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getTable(id: string): Promise<ITable> {
    try {
      const table = await Table.findById(id);
      if (!table) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `Table not found`);
      }
      return table;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getTableByTags(tags: string): Promise<ITable[]> {
    try {
      const tables = await Table.find({ tags: tags })
        .populate({
          path: 'teams',
          populate: {
            path: 'coach',
            model: SCHEMA.COACH,
          },
        })
        .exec();
      if (!tables) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `Table not found`);
      }
      return tables;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createTable(tableData: ITable): Promise<ITable> {
    const { name, teams, leaderBoard, matches, tags } = tableData;
    const existsTableName = await Table.findOne({
      name: tableData.name,
    });
    if (existsTableName) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Table already exists`);
    }
    const newTable = new Table({
      name,
      teams,
      leaderBoard,
      matches,
      tags,
    });
    try {
      const table = await newTable.save();
      return table;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateTable(TableData: ITable, id: string): Promise<ITable> {
    const { name, teams, leaderBoard, matches, tags } = TableData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Table with id: ${id}`);
    }

    const newTable = new Table({
      name,
      teams,
      leaderBoard,
      matches,
      tags,
    });
    try {
      const updateTable = await Table.findByIdAndUpdate(id, newTable, {
        new: true,
      });
      return updateTable!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteTable(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No table with id: ${id}`);
    }

    try {
      await Table.findByIdAndRemove(id);
      return 'Table deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
