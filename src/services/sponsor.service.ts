import { Sponsor } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { ISponsor } from '@/interfaces';
import { ObjectId } from 'mongodb';
@Service()
export class SponsorService {
    public async getSponsors(): Promise<ISponsor[]> {
        try {
            const sponsors = await Sponsor.find();
            if (!sponsors) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `sponsors not found`,
                );
            }
            return sponsors;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async getSponsor(id: string): Promise<ISponsor> {
        try {
            const sponsor = await Sponsor.findById(id);
            if (!sponsor) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `sponsor not found`,
                );
            }
            return sponsor;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async createSponsor(sponsorData: ISponsor): Promise<ISponsor> {
        const { name, logo, email } = sponsorData;
        const existsSponsorName = await Sponsor.findOne({
            name: sponsorData.name,
        });
        if (existsSponsorName) {
            throw new HttpException(
                HTTP_STATUS.UNPROCESSABLE_ENTITY,
                `Sponsor already exists`,
            );
        }
        const newSponsor = new Sponsor({
            name,
            logo,
            email,
        });
        try {
            const sponsor = await newSponsor.save();
            return sponsor;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async updateSponsor(
        sponsorData: ISponsor,
        id: string,
    ): Promise<ISponsor> {
        const { name, logo, email } = sponsorData;

        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No Sponsor with id: ${id}`,
            );
        }

        const newSponsor = new Sponsor({
            name,
            logo,
            email,
        });
        try {
            const updateSponsor = await Sponsor.findByIdAndUpdate(
                id,
                newSponsor,
                {
                    new: true,
                },
            );
            return updateSponsor!;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async deleteSponsor(id: string): Promise<string> {
        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No Sponsor with id: ${id}`,
            );
        }

        try {
            await Sponsor.findByIdAndRemove(id);
            return 'sponsor deleted successfully!';
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }
}
