import sharp from 'sharp';
import * as fs from 'fs/promises';
import { randomBytes } from 'crypto';
export async function ConvertToPng(inputPath: string): Promise<void> {

  try {
    const outputFile = 'image.png';
    await sharp(inputPath)
      .png()
      .toFile(outputFile);
    console.log(`แปลงไฟล์ "<span class="math-inline">\{inputPath\}" เป็น "</span>{outputPath}" สำเร็จ`);
  } catch (error) {
    console.error(`เกิดข้อผิดพลาดในการแปลงไฟล์:`, error);
  }
}

// ตัวอย่างการใช้งาน
const inputFile = 'image.jpg'; // เปลี่ยนเป็นชื่อไฟล์รูปภาพต้นฉบับของคุณ


// convertToPng(inputFile);