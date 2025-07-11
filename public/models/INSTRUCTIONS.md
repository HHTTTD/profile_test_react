# 🚗 ToyCar.glb Instructions

## ปัญหาที่พบ
- **CSP Errors**: Content Security Policy บล็อก blob URLs
- **Texture Loading**: ToyCar.glb ใช้ external textures ที่ถูกบล็อก
- **WebGL Context**: ปัญหา WebGL context lost

## ✅ วิธีแก้ไข

### Option 1: ใช้ Simple Model (แนะนำ)
1. หา .glb ไฟล์ที่ไม่มี external textures
2. หรือ export model ใหม่โดยไม่แยก texture files
3. ใช้ tools เช่น Blender เพื่อ "bake" textures เข้าไปในไฟล์

### Option 2: ใช้ Online 3D Model 
```javascript
// แทนที่ url ใน App.js
url="https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf"
```

### Option 3: ใช้ Basic Model ไม่มี Texture
```javascript
// ในกรณีที่ต้องการใช้งานจริง
url="/models/ToyCar.glb"
```

## 🔧 การเปิดใช้ 3D Model
เปิดไฟล์ `src/App.js` และแก้ไข `ModelViewerWithFallback`:

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
    url="/models/ToyCar.glb"
    width={320}
    height={320}
    autoRotate={true}
    // ... other props
  />
);
```

## 🛡️ ปลอดภัย
ตอนนี้ใช้ emoji fallback เพื่อหลีกเลี่ยง errors ใน Console 