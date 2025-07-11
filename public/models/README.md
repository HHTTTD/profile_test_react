# 3D Models Folder

## วิธีการใช้ไฟล์ .glb ของคุณเอง

1. **วางไฟล์ .glb ของคุณ** ในโฟลเดอร์นี้ (`public/models/`)
2. **เปลี่ยนชื่อไฟล์** เป็น `robot.glb` หรือแก้ไข URL ใน App.js
3. **รีสตาร์ทเซิร์ฟเวอร์** React (`npm start`)

## รูปแบบไฟล์ที่รองรับ
- `.glb` (แนะนำ - รวมทุกอย่างในไฟล์เดียว)
- `.gltf` (พร้อมไฟล์ texture แยก)
- `.fbx`
- `.obj`

## ตัวอย่างการใช้งาน

### ถ้าไฟล์ของคุณชื่อ `mymodel.glb`:
1. วางไฟล์ใน `public/models/mymodel.glb`
2. แก้ไขใน `src/App.js` บรรทัดที่มี `url="/models/robot.glb"`
3. เปลี่ยนเป็น `url="/models/mymodel.glb"`

### หรือเปลี่ยนชื่อไฟล์:
1. เปลี่ยนชื่อไฟล์ของคุณเป็น `robot.glb`
2. วางในโฟลเดอร์นี้
3. จะทำงานโดยอัตโนมัติ

## 🎯 เคล็ดลับ
- ไฟล์ควรมีขนาดไม่เกิน 10MB เพื่อความเร็วในการโหลด
- แนะนำให้ใช้ .glb เพราะโหลดเร็วกว่า
- ตรวจสอบว่าไฟล์ไม่เสียหายก่อนนำมาใช้

## 🚀 หากต้องการใช้ ModelViewer
ไปที่ `src/App.js` และแก้ไข `ModelViewerWithFallback` function:

```javascript
// เปลี่ยนจาก:
return (
  <div className="flex items-center justify-center w-full h-full">
    <div className="text-8xl animate-bounce">👨‍💻</div>
  </div>
);

// เป็น:
return (
  <ModelViewer
    url="/models/robot.glb"
    width={320}
    height={320}
    autoRotate={true}
    // ... other props
  />
);
``` 