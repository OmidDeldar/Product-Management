import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";


export class UploadFileConfigService implements MulterOptionsFactory{
    createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions> {
        const options:MulterModuleOptions={
            storage:diskStorage({
                destination:'./uploads',
                filename:(req,file,cb)=>{
                    const name=file.originalname.split('.')[0];
                    const fileExtention=file.originalname.split('.')[1];
                    const newFileName=name.split('')+'_'+Date.now()+'.'+fileExtention;
                    file.originalname=newFileName;
                    cb(null,newFileName);
                }
            }),
            fileFilter:(req,file,cb)=>{
                if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
                    return cb(null,false)
                }
                cb(null,true);
            }
        }

        return options
    }
}