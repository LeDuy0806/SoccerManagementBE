import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { TableService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { ITable } from '@/interfaces';

export class TableController {
    public table = Container.get(TableService);

    public getTables = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const tables = await this.table.getTables();
            res.status(HTTP_STATUS.OK).json(tables);
        } catch (error) {
            next(error);
        }
    };

    public getTable = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const table = await this.table.getTable(id);
            res.status(HTTP_STATUS.OK).json(table);
        } catch (error) {
            next(error);
        }
    };

    public getTableByTags = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { tags }: any = req.params;
        try {
            const tables = await this.table.getTableByTags(tags);
            res.status(HTTP_STATUS.OK).json(tables);
        } catch (error) {
            next(error);
        }
    };

    public createTable = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const tableData: ITable = req.body;
        try {
            const table = await this.table.createTable(tableData);
            res.status(HTTP_STATUS.OK).json(table);
        } catch (error) {
            next(error);
        }
    };

    public updateTable = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const tableData: ITable = req.body;
        try {
            const table = await this.table.updateTable(tableData, id);
            res.status(HTTP_STATUS.OK).json(table);
        } catch (error) {
            next(error);
        }
    };

    public deleteTable = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.table.deleteTable(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
