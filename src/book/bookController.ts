import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import bookModel from "./bookModel";
import createHttpError from "http-errors";
import fs from "node:fs";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, genre, description } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    //Cover Image Da MIME Type Extract Karna:
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        fileName
    );
 
    // Cloudinary Te Cover Image Upload Karna:
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "book-covers",
            format: coverImageMimeType,
        });

        // Book PDF File Upload Karna:
        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(
            __dirname,
            "../../public/data/uploads",
            bookFileName
        );
      
        const bookFileUploadResult = await cloudinary.uploader.upload(
            bookFilePath,
            {
                resource_type: "raw",
                filename_override: bookFileName,
                folder: "book-pdfs",
                format: "pdf",
            }
        );
        
        //New Book MongoDB Ch Create Karna
        const newBook = await bookModel.create({
            title,
            description,
            genre,
            author:"67455de1d62418bae868e081",
            coverImage: uploadResult.secure_url,
            file: bookFileUploadResult.secure_url,
        });

        //Temporary Files Delete Karna
        try {
            await fs.promises.unlink(filePath);
            await fs.promises.unlink(bookFilePath);
        } catch (unlinkError) {
            console.log("Error deleting files:", unlinkError);
        }
        res.status(201).json({ id: newBook._id });
    } catch (err) {
        console.log(err);
        return next(createHttpError(500, "Error while uploading the files."));
    }
};


export { createBook };