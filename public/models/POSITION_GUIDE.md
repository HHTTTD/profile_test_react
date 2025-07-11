# 🚗 ToyCar Position Guide

## 🎯 การปรับ Position ของ ToyCar Model

### 📍 **พารามิเตอร์สำหรับปรับตำแหน่ง**

#### 1. **modelXOffset** - เลื่อนซ้าย/ขวา
```javascript
modelXOffset={0}      // กลาง (default)
modelXOffset={0.2}    // เลื่อนขวา
modelXOffset={-0.2}   // เลื่อนซ้าย
```

#### 2. **modelYOffset** - เลื่อนขึ้น/ลง  
```javascript
modelYOffset={0}      // กลาง (default)
modelYOffset={-0.1}   // เลื่อนขึ้น ⬆️ (ปัจจุบัน)
modelYOffset={0.1}    // เลื่อนลง ⬇️
```

#### 3. **defaultRotationX** - หมุนขึ้น/ลง
```javascript
defaultRotationX={0}    // ตรง (ปัจจุบัน)
defaultRotationX={-10}  // เอียงขึ้น
defaultRotationX={10}   // เอียงลง
```

#### 4. **defaultRotationY** - หมุนซ้าย/ขวา
```javascript
defaultRotationY={30}   // หันขวา (ปัจจุบัน)
defaultRotationY={0}    // หันหน้าตรง
defaultRotationY={-30}  // หันซ้าย
```

#### 5. **defaultZoom** - ขนาดใหญ่/เล็ก
```javascript
defaultZoom={0.15}  // ใกล้มาก (ปัจจุบัน)
defaultZoom={0.1}   // ใกล้มากขึ้น
defaultZoom={0.3}   // ไกลออกไป
```

---

## 🛠️ **วิธีปรับแต่ง**

### **ขั้นตอนที่ 1**: เปิดไฟล์ `src/App.js`
### **ขั้นตอนที่ 2**: หาส่วน `<ModelViewer`
### **ขั้นตอนที่ 3**: แก้ไขค่าที่ต้องการ

---

## 📋 **ตัวอย่างการปรับแต่ง**

### 🎯 **เลื่อนรถไปกลางจริงๆ**
```javascript
modelXOffset={0}
modelYOffset={0}
```

### 🎯 **หมุนรถให้หันหน้าตรง**
```javascript
defaultRotationY={0}
```

### 🎯 **ทำให้รถดูใหญ่ขึ้นอีก**
```javascript
defaultZoom={0.1}   // หรือเล็กกว่า 0.05
```

### 🎯 **เลื่อนรถขึ้นมาหน่อย**
```javascript
modelYOffset={-0.2}  // ค่าติดลบ = ขึ้น
```

### 🎯 **เอียงรถเล็กน้อย**
```javascript
defaultRotationX={-5}   // เอียงขึ้นเล็กน้อย
defaultRotationY={45}   // หมุนให้เห็นมุม 3/4
```

---

## 🎨 **การตั้งค่าแนะนำ**

### **สำหรับ Portfolio (มืออาชีพ)**
```javascript
modelXOffset={0}
modelYOffset={-0.05}
defaultRotationX={-5}
defaultRotationY={25}
defaultZoom={0.12}
```

### **สำหรับ Showcase (ดูดี)**
```javascript
modelXOffset={0}
modelYOffset={0}
defaultRotationX={0}
defaultRotationY={45}
defaultZoom={0.1}
```

### **สำหรับ Close-up (รายละเอียด)**
```javascript
modelXOffset={0}
modelYOffset={-0.1}
defaultRotationX={-10}
defaultRotationY={20}
defaultZoom={0.08}
```

---

## ⚡ **Tips**
- **ค่าเล็ก** = การเปลี่ยนแปลงเล็กน้อย
- **ค่าติดลบ** = ทิศตรงข้าม
- **ทดลองทีละนิด** เพื่อผลลัพธ์ที่ดี
- **รีเฟรชหน้าเว็บ** หลังแก้ไข 