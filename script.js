// Thai Electrical Calculator Script - EIT Standard

// Standard MCCB Ratings (Amperes)
const mccbSizes = [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 320, 400, 500, 630, 800, 1000, 1250, 1500, 1600, 1800, 2000, 2500, 3000, 3200, 4000];

// Conductor Sizes (sq.mm.)
const cableSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500];

// Cable properties for conduit/wireway fill (Area includes insulation - from EIT standard)
const cableSpecs = {
    'COPPER': {
        'IEC_01': {
            1.5: { od: 3.3, area: 8.55 },
            2.5: { od: 4.0, area: 12.56 },
            4: { od: 4.6, area: 16.61 },
            6: { od: 5.2, area: 21.23 },
            10: { od: 6.7, area: 35.24 },
            16: { od: 7.8, area: 47.76 },
            25: { od: 9.7, area: 73.86 },
            35: { od: 10.9, area: 93.27 },
            50: { od: 12.8, area: 128.61 },
            70: { od: 14.6, area: 167.33 },
            95: { od: 17.1, area: 229.54 },
            120: { od: 18.8, area: 277.45 },
            150: { od: 20.9, area: 342.90 },
            185: { od: 23.3, area: 426.17 },
            240: { od: 26.6, area: 555.43 },
            300: { od: 29.6, area: 687.79 },
            400: { od: 33.2, area: 865.26 },
            500: { od: 38.0, area: 1064.00 }
        },
        'NYY_1C': {
            1.5: { od: 6.5, area: 33.17 },
            2.5: { od: 7.0, area: 38.47 },
            4: { od: 7.5, area: 44.16 },
            6: { od: 8.0, area: 50.24 },
            10: { od: 9.0, area: 63.59 },
            16: { od: 9.5, area: 70.85 },
            25: { od: 11.5, area: 103.82 },
            35: { od: 12.5, area: 122.66 },
            50: { od: 14.0, area: 153.86 },
            70: { od: 15.5, area: 188.60 },
            95: { od: 17.5, area: 240.41 },
            120: { od: 19.5, area: 298.50 },
            150: { od: 21.5, area: 362.87 },
            185: { od: 23.5, area: 433.52 },
            240: { od: 26.5, area: 551.27 },
            300: { od: 29.0, area: 660.19 },
            400: { od: 33.0, area: 855.00 },
            500: { od: 38.5, area: 1164.00 }
        },
        'CV_1C': {
            1.5: { od: 5.0, area: 19.63 },
            2.5: { od: 5.4, area: 22.90 },
            4: { od: 6.0, area: 28.27 },
            6: { od: 6.6, area: 34.21 },
            10: { od: 7.5, area: 44.18 },
            16: { od: 8.5, area: 56.74 },
            25: { od: 10.0, area: 78.54 },
            35: { od: 11.0, area: 95.03 },
            50: { od: 12.5, area: 122.72 },
            70: { od: 14.0, area: 153.94 },
            95: { od: 16.0, area: 201.06 },
            120: { od: 17.5, area: 240.53 },
            150: { od: 19.5, area: 298.65 },
            185: { od: 21.5, area: 363.05 },
            240: { od: 24.0, area: 452.39 },
            300: { od: 26.5, area: 551.55 },
            400: { od: 31.5, area: 829.58 },
            500: { od: 35.0, area: 1443.00 }
        }
    },
    'ALUMINUM': {
        'IEC_01': {
            10: { od: 7.5, area: 44.18 },
            16: { od: 8.5, area: 56.74 },
            25: { od: 10.0, area: 78.54 },
            35: { od: 11.2, area: 98.52 },
            50: { od: 13.0, area: 132.73 },
            70: { od: 14.8, area: 172.03 },
            95: { od: 17.0, area: 226.98 },
            120: { od: 18.8, area: 277.59 },
            150: { od: 20.8, area: 339.79 },
            185: { od: 23.2, area: 422.73 },
            240: { od: 26.3, area: 543.25 },
            300: { od: 29.2, area: 669.66 },
            400: { od: 33.0, area: 855.30 },
            500: { od: 37.0, area: 1075.00 }
        },
        'NYY_1C': {
            10: { od: 9.8, area: 75.43 },
            16: { od: 10.5, area: 86.59 },
            25: { od: 12.0, area: 113.10 },
            35: { od: 13.5, area: 143.14 },
            50: { od: 15.0, area: 176.71 },
            70: { od: 17.0, area: 226.98 },
            95: { od: 19.0, area: 283.53 },
            120: { od: 21.0, area: 346.36 },
            150: { od: 23.0, area: 415.48 },
            185: { od: 25.5, area: 510.71 },
            240: { od: 28.5, area: 637.94 },
            300: { od: 31.5, area: 779.31 },
            400: { od: 35.0, area: 962.11 },
            500: { od: 39.0, area: 1200.00 }
        },
        'CV_1C': {
            10: { od: 8.2, area: 52.81 },
            16: { od: 9.0, area: 63.62 },
            25: { od: 10.5, area: 86.59 },
            35: { od: 11.8, area: 109.36 },
            50: { od: 13.5, area: 143.14 },
            70: { od: 15.0, area: 176.71 },
            95: { od: 17.2, area: 232.35 },
            120: { od: 19.0, area: 283.53 },
            150: { od: 21.0, area: 346.36 },
            185: { od: 23.0, area: 415.48 },
            240: { od: 26.0, area: 530.93 },
            300: { od: 28.8, area: 651.44 },
            400: { od: 32.5, area: 829.58 },
            500: { od: 36.5, area: 1045.00 }
        }
    }
};

// Voltage drop factors (mV/A/m) from EIT tables
const vdFactors = {
    'COPPER': {
        1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.81,
        35: 1.33, 50: 1.00, 70: 0.71, 95: 0.56, 120: 0.48, 150: 0.41,
        185: 0.36, 240: 0.30, 300: 0.27, 400: 0.25, 500: 0.23
    },
    'ALUMINUM': {
        10: 7.5, 16: 4.6, 25: 3.0, 35: 2.2, 50: 1.6, 70: 1.2, 95: 0.92,
        120: 0.79, 150: 0.68, 185: 0.59, 240: 0.49, 300: 0.44, 400: 0.41,
        500: 0.38
    }
};

// Standard Conduit sizes
const conduitSizes = [
    { size: 15, name: '1/2" (15mm)', area: 177 },
    { size: 20, name: '3/4" (20mm)', area: 314 },
    { size: 25, name: '1" (25mm)', area: 491 },
    { size: 32, name: '1 1/4" (32mm)', area: 804 },
    { size: 40, name: '1 1/2" (40mm)', area: 1257 },
    { size: 50, name: '2" (50mm)', area: 1964 },
    { size: 65, name: '2 1/2" (65mm)', area: 3318 },
    { size: 80, name: '3" (80mm)', area: 5027 },
    { size: 90, name: '3 1/2" (90mm)', area: 6362 },
    { size: 100, name: '4" (100mm)', area: 7854 },
    { size: 125, name: '5" (125mm)', area: 12272 },
    { size: 150, name: '6" (150mm)', area: 17672 }
];

// Standard Wireway sizes
const wirewaySizes = [
    { width: 50, height: 100, name: '50x100 mm', area: 5000 },
    { width: 75, height: 100, name: '75x100 mm', area: 7500 },
    { width: 100, height: 100, name: '100x100 mm', area: 10000 },
    { width: 100, height: 150, name: '100x150 mm', area: 15000 },
    { width: 150, height: 150, name: '150x150 mm', area: 22500 },
    { width: 100, height: 200, name: '100x200 mm', area: 20000 },
    { width: 150, height: 200, name: '150x200 mm', area: 30000 },
    { width: 100, height: 250, name: '100x250 mm', area: 25000 },
    { width: 150, height: 250, name: '150x250 mm', area: 37500 },
    { width: 100, height: 300, name: '100x300 mm', area: 30000 },
    { width: 150, height: 300, name: '150x300 mm', area: 45000 },
    { width: 200, height: 300, name: '200x300 mm', area: 60000 }
];

// Standard Ampacity tables
const ampacityTable = {
    'COPPER': {
        'IEC_01': {
            '1Ø': {
                1.5: 15, 2.5: 21, 4: 28, 6: 36, 10: 50, 16: 66, 25: 88, 35: 109,
                50: 131, 70: 167, 95: 202, 120: 234, 150: 261, 185: 297, 240: 348,
                300: 398, 400: 475, 500: 540
            },
            '3Ø': {
                1.5: 14, 2.5: 18, 4: 24, 6: 31, 10: 44, 16: 59, 25: 77, 35: 96,
                50: 117, 70: 149, 95: 180, 120: 208, 150: 228, 185: 258, 240: 301,
                300: 343, 400: 406, 500: 468
            }
        },
        'NYY_1C': {
            '1Ø': {
                1.5: 17, 2.5: 23, 4: 31, 6: 42, 10: 60, 16: 81, 25: 111, 35: 137,
                50: 169, 70: 217, 95: 271, 120: 316, 150: 364, 185: 424, 240: 509,
                300: 592, 400: 696, 500: 800
            },
            '3Ø': {
                1.5: 15, 2.5: 20, 4: 27, 6: 35, 10: 50, 16: 66, 25: 89, 35: 110,
                50: 134, 70: 171, 95: 212, 120: 244, 150: 279, 185: 324, 240: 388,
                300: 448, 400: 521, 500: 600
            }
        },
        'CV_1C': {
            '1Ø': {
                1.5: 22, 2.5: 31, 4: 42, 6: 54, 10: 71, 16: 94, 25: 124, 35: 150,
                50: 180, 70: 223, 95: 271, 120: 313, 150: 355, 185: 406, 240: 477,
                300: 543, 400: 625, 500: 710
            },
            '3Ø': {
                1.5: 18, 2.5: 25, 4: 34, 6: 44, 10: 59, 16: 77, 25: 99, 35: 119,
                50: 145, 70: 179, 95: 215, 120: 247, 150: 279, 185: 321, 240: 371,
                300: 418, 400: 478, 500: 550
            }
        }
    },
    'ALUMINUM': {
        'IEC_01': {
            '1Ø': {
                10: 39, 16: 51, 25: 68, 35: 84, 50: 113, 70: 141, 95: 171, 120: 202,
                150: 240, 185: 282, 240: 328, 300: 373, 400: 448, 500: 520
            },
            '3Ø': {
                10: 30, 16: 40, 25: 56, 35: 67, 50: 78, 70: 92, 95: 113, 120: 127,
                150: 141, 185: 171, 240: 221, 300: 271, 400: 315, 500: 360
            }
        },
        'NYY_1C': {
            '1Ø': {
                10: 46, 16: 62, 25: 85, 35: 105, 50: 130, 70: 167, 95: 208, 120: 243,
                150: 280, 185: 326, 240: 391, 300: 455, 400: 535, 500: 615
            },
            '3Ø': {
                10: 35, 16: 48, 25: 65, 35: 81, 50: 100, 70: 128, 95: 159, 120: 186,
                150: 213, 185: 249, 240: 298, 300: 347, 400: 408, 500: 470
            }
        },
        'CV_1C': {
            '1Ø': {
                10: 54, 16: 72, 25: 95, 35: 115, 50: 138, 70: 171, 95: 208, 120: 240,
                150: 272, 185: 311, 240: 365, 300: 415, 400: 477, 500: 550
            },
            '3Ø': {
                10: 41, 16: 55, 25: 72, 35: 87, 50: 105, 70: 130, 95: 158, 120: 181,
                150: 202, 185: 237, 240: 278, 300: 316, 400: 362, 500: 420
            }
        }
    }
};

// Standard primary fuse ratings for high voltage (Amperes)
const standardFuseSizes = [1, 2, 3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 65, 80, 100];

// Sizing Calculations based on Inputs
function calculateSizing(inputs) {
    const { mode, phase, loadCurrent, breakerSize, loadType, cableMaterial, cableType, installation, conduitType } = inputs;
    
    let selectedMccb = breakerSize;
    if (mode === 'load') {
        const multiplier = (loadType === 'continuous') ? 1.25 : 1.0;
        const targetMccb = loadCurrent * multiplier;
        selectedMccb = mccbSizes.find(size => size >= targetMccb);
        if (!selectedMccb) {
            selectedMccb = mccbSizes[mccbSizes.length - 1];
        }
    }
    
    let phaseCount = (phase === '1Ø') ? 2 : 3;
    let groundCount = 1;
    let totalCablesCount = phaseCount + groundCount;

    let selectedPhaseSize = 1.5;
    
    const materialMap = ampacityTable[cableMaterial] || ampacityTable['COPPER'];
    const typeMap = materialMap[cableType] || materialMap['IEC_01'];
    const ampacityMap = typeMap[phase];
    
    const requiredAmpacity = selectedMccb;
    let foundCable = false;
    
    const availableSizes = Object.keys(ampacityMap).map(Number).sort((a,b)=>a-b);
    
    for (let size of availableSizes) {
        if (ampacityMap[size] >= requiredAmpacity) {
            selectedPhaseSize = size;
            foundCable = true;
            break;
        }
    }
    
    let parallelRuns = 1;
    if (!foundCable) {
        const maxSingleSize = availableSizes[availableSizes.length - 1];
        const maxSingleAmp = ampacityMap[maxSingleSize];
        parallelRuns = Math.ceil(requiredAmpacity / maxSingleAmp);
        selectedPhaseSize = maxSingleSize;
    }
    
    const selectedEgcSize = getEgcSize(selectedMccb);
    const selectedGecSize = getGecSize(selectedPhaseSize);
    
    // Conduit sizing is calculated per run (since parallel runs are run in separate conduits)
    const specsMap = cableSpecs[cableMaterial] || cableSpecs['COPPER'];
    const spec = specsMap[cableType] || specsMap['IEC_01'];
    
    // Cable area per run (1 set of phase cables + 1 set of ground cable)
    const phaseAreaPerRun = (spec[selectedPhaseSize] ? spec[selectedPhaseSize].area : 0) * phaseCount;
    const egcAreaPerRun = (spec[selectedEgcSize] ? spec[selectedEgcSize].area : 0) * groundCount;
    const totalCableAreaPerRun = phaseAreaPerRun + egcAreaPerRun;
    
    const fillLimit = (totalCablesCount >= 3) ? 0.40 : (totalCablesCount === 2 ? 0.31 : 0.53);
    const requiredConduitArea = totalCableAreaPerRun / fillLimit;
    
    let selectedConduit = conduitSizes.find(c => c.area >= requiredConduitArea);
    if (!selectedConduit) {
        selectedConduit = { name: 'เกินพิกัดท่อเดี่ยว (แนะนำเดินขนาน)', area: requiredConduitArea };
    }
    
    // Wireway is shared for all cables across all parallel runs
    const totalCableAreaAllRuns = totalCableAreaPerRun * parallelRuns;
    const requiredWirewayArea = totalCableAreaAllRuns / 0.20;
    let selectedWireway = wirewaySizes.find(w => w.area >= requiredWirewayArea);
    if (!selectedWireway) {
        selectedWireway = { name: 'เกินขนาดมาตรฐาน (แนะนำเดินขนาน)', area: requiredWirewayArea };
    }
    
    return {
        mccb: selectedMccb,
        phaseSize: selectedPhaseSize,
        egcSize: selectedEgcSize,
        gecSize: selectedGecSize,
        parallelRuns,
        totalArea: totalCableAreaPerRun,
        conduit: selectedConduit.name,
        wireway: selectedWireway.name,
        fillLimit: (fillLimit * 100).toFixed(0) + '%',
        actualFill: selectedConduit.area ? ((totalCableAreaPerRun / selectedConduit.area) * 100).toFixed(1) + '%' : 'N/A'
    };
}

// Transformer Sizing and Protection calculations
function calculateTransformer(inputs) {
    const { kva, vHv, percentZ, trType } = inputs;
    
    const ip = kva / (Math.sqrt(3) * vHv);
    const targetFuse = ip * 1.33;
    let recommendedFuse = standardFuseSizes.find(size => size >= targetFuse);
    if (!recommendedFuse) {
        recommendedFuse = standardFuseSizes[standardFuseSizes.length - 1];
    }
    
    const is = kva / (Math.sqrt(3) * 0.4);
    const isc = is / (percentZ / 100);
    const iscDesign = isc * 1.25;
    
    const targetBreaker = is * 1.25;
    let recommendedBreaker = mccbSizes.find(size => size >= targetBreaker);
    if (!recommendedBreaker) {
        recommendedBreaker = mccbSizes[mccbSizes.length - 1];
    }
    
    let recommendedBreakerType = 'MCCB (Molded Case Circuit Breaker)';
    let typeReason = 'เนื่องจากกระแสไฟฟ้าด้านแรงต่ำสูงสุดไม่เกิน 800 A การเลือกใช้ MCCB จึงเหมาะสม ประหยัดค่าใช้จ่าย และสามารถเลือกพิกัดทนกระแสลัดวงจร (IC) ที่ตรงตามพิกัด Isc ได้';
    
    if (recommendedBreaker >= 800 && recommendedBreaker <= 1250) {
        recommendedBreakerType = 'MCCB (ชนิด Electronic Trip) หรือ ACB';
        typeReason = 'กระแสไฟฟ้าอยู่ในช่วง 800A ถึง 1250A สามารถเลือกใช้ MCCB คุณภาพสูงรุ่นที่มีชุดปรับตั้งแบบอิเล็กทรอนิกส์ได้ แต่หากติดตั้งในแผงสวิตช์ประธานขนาดใหญ่ที่ต้องเปิดใช้งานต่อเนื่องและต้องการความทนทานเชิงกลสูง แนะนำให้เลือกใช้ ACB (Air Circuit Breaker)';
    } else if (recommendedBreaker > 1250) {
        recommendedBreakerType = 'ACB (Air Circuit Breaker)';
        typeReason = 'กระแสไฟฟ้าด้านแรงต่ำสูงเกิน 1250 A จำเป็นต้องเลือกใช้ ACB เพื่อความคงทนและทนทานเชิงกลที่สูงกว่า, มีความยืดหยุ่นในการปรับแต่งพิกัดป้องกัน และมีพิกัดการทนกระแสลัดวงจร (kA) ที่สูงเพื่อรองรับแรงเค้นเชิงกลและเชิงความร้อนได้อย่างปลอดภัย';
    }
    
    return {
        ip: ip.toFixed(2),
        fuseCalc: targetFuse.toFixed(2),
        recommendedFuse,
        is: is.toFixed(2),
        isc: (isc / 1000).toFixed(2),
        iscDesign: (iscDesign / 1000).toFixed(2),
        recommendedBreaker,
        breakerType: recommendedBreakerType,
        reason: typeReason
    };
}

// Sizing based on maximum allowed voltage drop
function findCableSizeForVoltageDrop(inputs) {
    const { phase, loadCurrent, breakerSize, mode, cableMaterial, cableType, distance } = inputs;
    
    const current = (mode === 'load') ? loadCurrent : breakerSize;
    const systemVoltage = (phase === '1Ø') ? 230 : 400;
    const maxVdropAllow = 0.05 * systemVoltage; // 5% limit
    
    // Find matching cable size based on current first
    const baseSizing = calculateSizing(inputs);
    let selectedSize = baseSizing.phaseSize;
    let parallelRuns = baseSizing.parallelRuns;
    
    const materialFactors = vdFactors[cableMaterial] || vdFactors['COPPER'];
    
    // Calculate current voltage drop at base size
    let vdFactor = materialFactors[selectedSize] || 2.0;
    let currentVdrop = (vdFactor * (current / parallelRuns) * distance) / 1000;
    
    // If current drop <= max allow, return baseline
    if (currentVdrop <= maxVdropAllow) {
        return {
            vdropVal: currentVdrop.toFixed(2),
            pct: ((currentVdrop / systemVoltage) * 100).toFixed(2),
            upsizedNeeded: false,
            recommendedSize: selectedSize
        };
    }
    
    // Iterate larger cable sizes to find one that brings the drop <= 5%
    const materialMap = ampacityTable[cableMaterial];
    const typeMap = materialMap[cableType];
    const ampMap = typeMap[phase];
    const availableSizes = Object.keys(ampMap).map(Number).sort((a,b)=>a-b);
    
    let recommendedSize = selectedSize;
    let foundSizing = false;
    
    const baseIndex = availableSizes.indexOf(selectedSize);
    if (baseIndex !== -1) {
        for (let i = baseIndex; i < availableSizes.length; i++) {
            const size = availableSizes[i];
            const sizeVdFactor = materialFactors[size] || 2.0;
            const sizeVdrop = (sizeVdFactor * (current / parallelRuns) * distance) / 1000;
            
            if (sizeVdrop <= maxVdropAllow) {
                recommendedSize = size;
                currentVdrop = sizeVdrop;
                foundSizing = true;
                break;
            }
        }
    }
    
    return {
        vdropVal: currentVdrop.toFixed(2),
        pct: ((currentVdrop / systemVoltage) * 100).toFixed(2),
        upsizedNeeded: foundSizing && (recommendedSize !== selectedSize),
        recommendedSize
    };
}

// Generate standard lookup table dynamically
function generateLookupTable(cableType, phase, material) {
    let rows = [];
    const materialMap = ampacityTable[material || 'COPPER'];
    const typeMap = materialMap[cableType] || materialMap['IEC_01'];
    const ampMap = typeMap[phase];
    
    mccbSizes.forEach(mccb => {
        if (mccb > 800) return; 
        
        let phaseSize = null;
        const availableSizes = Object.keys(ampMap).map(Number).sort((a,b)=>a-b);
        for (let size of availableSizes) {
            if (ampMap[size] >= mccb) {
                phaseSize = size;
                break;
            }
        }
        
        if (!phaseSize) return; 
        
        const egc = getEgcSize(mccb);
        const spec = (cableSpecs[material || 'COPPER'])[cableType] || (cableSpecs[material || 'COPPER'])['IEC_01'];
        const phaseCount = (phase === '1Ø') ? 2 : 4; 
        
        const totalArea = (spec[phaseSize].area * phaseCount) + spec[egc].area;
        const requiredConduitArea = totalArea / 0.40;
        let conduit = conduitSizes.find(c => c.area >= requiredConduitArea);
        
        rows.push({
            mccb,
            cable: `${phaseCount}x${phaseSize}/${egc}G`,
            area: totalArea.toFixed(1),
            conduit: conduit ? conduit.name.split(' ')[0] : 'N/A'
        });
    });
    
    return rows;
}
