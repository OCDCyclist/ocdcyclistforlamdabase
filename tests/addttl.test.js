const {addttl} = require('../src/utils/addttl');

const recentRideRaw = {
    "resource_state": 2,
    "athlete": { "id": 8116, "resource_state": 1 },
    "name": "Disco Cool Down",
    "distance": 9797.2,
    "moving_time": 1165,
    "elapsed_time": 1165,
    "total_elevation_gain": 60,
    "type": "VirtualRide",
    "id": 7015389653,
    "start_date": "2022-04-21T00:57:03Z",
    "start_date_local": "2022-04-20T17:57:03Z",
    "timezone": "(GMT-08:00) America/Los_Angeles",
    "utc_offset": -25200,
    "location_city": null,
    "location_state": null,
    "location_country": "United States",
    "achievement_count": 0,
    "kudos_count": 3,
    "comment_count": 0,
    "athlete_count": 1,
    "photo_count": 0,
    "map": {
      "id": "a7015389653",
      "summary_polyline": "hcbfAqb~y^cB{@gAwBWWa@IODi@b@gAt@iAn@OJ}CjBWVQ\\KJO@MCUUu@}Ac@sAc@eAq@kA_@a@q@[s@CECe@?KBaAHm@RKJIPCb@L|@Xx@LNPLtAp@JN@LGPUVm@f@KJ_@P_@XO@YWa@k@OGc@EOEIOIw@Oc@e@q@QMSEUAS@QD]RSTO\\G`@?NFNLJbA`@HP?TIt@BPHJZPz@XJFJF@PGNq@^ELLn@CLm@Vq@Nc@DSAa@KOIa@g@m@kAaBcFc@y@]_@e@]i@Yk@SsBk@UCqBq@sAq@{@i@wAiAk@q@Wc@Sc@q@sBMy@Gi@Ae@Bg@Fe@Nc@b@i@v@q@hEsCf@c@P[DS?QK_@KMq@k@mAs@QYC]DOHGt@SZAZGBOCi@a@_Ec@yCGoA?g@Dg@Jy@XkAp@mAb@k@ZYx@i@nAk@`A[PAbAYvCc@jCWdC[TAdAQTAbASf@Qd@S^[Xc@Zs@`AsCj@aAhA{@\\Q`@OdASfAAt@F`@HlAf@|@~@j@r@R`@hA~An@r@f@^^LPDr@DNBPCr@EbAKp@Mr@GpAUn@QnAY~DkAdL{CnBo@\\ININA`@Mp@E`@DNHTVDPBb@KxNEjAEb@Q~@uAvFGTs@nAI\\AT?jGA|@Ej@Od@GHSNYFW@KBiB@KDaDBm@CKGOMYc@_DwKa@o@k@g@WM[GM?YDe@TUR_@l@Qr@A^Fd@Jh@d@fAlEhJn@`ADLCLUNc@R[FuBZY@mARY@yATc@JUL[XOb@@XLTVL~@@XEd@Cb@Kd@ClB_@VAjASp@AJ@JDDLEFQRKDgAPuCTe@Je@@KBs@Bq@Jq@BKDGHAJBZNPf@BZFh@AdASZCFCdAAl@@HBh@@TDV@l@NHHJBRb@Db@DzAJb@T`@pAvAJPLb@@T?RERKLQLiB^MRARDVZ`ADTARGL",
      "resource_state": 2
    },
    "trainer": false,
    "commute": false,
    "manual": false,
    "private": false,
    "visibility": "everyone",
    "flagged": false,
    "gear_id": "b10115327",
    "start_latlng": [-11.648686230182648, 166.94841384887695],
    "end_latlng": [-11.650868207216263, 166.94881081581116],
    "average_speed": 8.41,
    "max_speed": 13.648,
    "average_cadence": 71.7,
    "average_watts": 99.6,
    "max_watts": 328,
    "weighted_average_watts": 101,
    "kilojoules": 116,
    "device_watts": true,
    "has_heartrate": true,
    "average_heartrate": 96.1,
    "max_heartrate": 108,
    "heartrate_opt_out": false,
    "display_hide_heartrate_option": true,
    "elev_high": 23,
    "elev_low": -6.2,
    "upload_id": 7466691051,
    "upload_id_str": "7466691051",
    "external_id": "zwift-activity-1061947461863489568.fit",
    "from_accepted_tag": false,
    "pr_count": 0,
    "total_photo_count": 1,
    "has_kudoed": false,
    "suffer_score": 2
};

describe('addttl basic tests', () =>{
    test('addttl exists and can be called', () => {
        expect( typeof( addttl ) ).toBe('function');
    });
    test('addttl returns an empty object if called with no arguments', () => {
        const actual = addttl();
        expect( typeof(actual) ).toBe('object');
        expect( Object.keys(actual).length ).toBe(0);
    });

    test('addttl returns an empty object if called with a non object', () => {
        const actual = addttl(123);
        expect( typeof(actual) ).toBe('object');
        expect( Object.keys(actual).length ).toBe(0);
    });
});

describe('addttl functional tests for a well formed Strava object', () =>{
    test('addttl sets the ttl property to a scalar numeric value', () => {
        const actual = addttl( recentRideRaw );
        expect( typeof(actual) ).toBe('object');
        expect( typeof(actual.ttl) ).toBe('number');
        expect( actual.ttl > 0 ).toBe(true);
    });

    test('addttl does nothing if the ttl property already exists', () => {
        const adjustObj =  Object.assign( {}, recentRideRaw);
        adjustObj.ttl = 'already here!';
        const actual = addttl( adjustObj );
        expect( typeof(actual) ).toBe('object');
        expect( typeof(actual.ttl) ).toBe('string');
        expect( actual.ttl).toBe('already here!');
    });
});

