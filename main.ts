let x_diff = 0
let x_center = 0
let x_endpoint = 0
let x_beginning = 0
maqueenPlusV2.I2CInit()
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultArrow)) {
        x_beginning = huskylens.readeArrow(1, Content2.xOrigin)
        x_endpoint = huskylens.readeArrow(1, Content2.xTarget)
        x_center = x_beginning + x_endpoint / 2
        x_diff = x_beginning - x_endpoint / 8
        x_diff = Math.trunc(x_diff)
        if (x_diff > 40) {
            x_diff = 40
        }
        if (x_diff < -40) {
            x_diff = -40
        }
        if (x_center < 120) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 10)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
        } else if (x_center > 200) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 10)
        } else if (x_center >= 120 && x_center <= 200) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 40 - x_diff)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 40 + x_diff)
        }
    }
})
