import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { TableRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { ITable } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class TableController {
  public table = Container.get(TableRepository);

  public getTables = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const tables = await this.table.getTables();
      res.status(HTTP_STATUS.OK).json({
        data: tables,
        status: HTTP_STATUS.OK,
        message: 'get tables successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTable = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const table = await this.table.getTable(id);
      res.status(HTTP_STATUS.OK).json({
        data: table,
        status: HTTP_STATUS.OK,
        message: 'get table successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTableByTags = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { tags }: any = req.params;
    try {
      const tables = await this.table.getTableByTags(tags);
      res.status(HTTP_STATUS.OK).json({
        data: tables,
        status: HTTP_STATUS.OK,
        message: 'get table by tags successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public createTable = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const tableData: ITable = req.body;
    try {
      const table = await this.table.createTable(tableData);
      res.status(HTTP_STATUS.CREATE).json({
        data: table,
        status: HTTP_STATUS.CREATE,
        message: 'create table successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateTable = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const tableData: ITable = req.body;
    try {
      const table = await this.table.updateTable(tableData, id);
      res.status(HTTP_STATUS.OK).json({
        data: table,
        status: HTTP_STATUS.OK,
        message: 'update table successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteTable = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.table.deleteTable(id);
      res.status(HTTP_STATUS.OK).json({
        data: result,
        status: HTTP_STATUS.OK,
        message: 'delete table successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
