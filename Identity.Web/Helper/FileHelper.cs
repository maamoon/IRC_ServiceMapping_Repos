using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace Identity.Web.Helper
{
    public class FileHelper
    {
        public static string SaveImage(Stream ms, string FolderAnddFileName)
        {
            try
            {

           
            string imageDirectoryPath = "";
            string imagePath = "";
            string FileNameToSave = "";
            string FolderNameToSaveTo = "";
            if (string.IsNullOrEmpty(FolderAnddFileName))
            {
                imagePath = "Attachments";
            }
            else
            {
                string[] FolderNameAndFileArr = FolderAnddFileName.Split('-');
                FolderNameToSaveTo = FolderNameAndFileArr[0];
                FileNameToSave = FolderNameAndFileArr[1];
                imagePath = string.Format("Attachments\\{0}", FolderNameToSaveTo);
            }

            string imageTempPath = Path.Combine(HttpRuntime.AppDomainAppPath,  imagePath);
            //*string ServerUrl = ConfigurationManager.AppSettings["SERVER_URL"];
            Directory.CreateDirectory(imageTempPath);
            Image classImage;
            classImage = Image.FromStream(ms, true);
            var i2 = new Bitmap(classImage);
           
            string imageName = string.Format("{0}" , FileNameToSave);
            string classPath = imageTempPath +"\\"+ imageName;
            i2.Save(classPath,ImageFormat.Jpeg);
            imageDirectoryPath = @"/" + imagePath + "//" + imageName;
            return imageDirectoryPath;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}