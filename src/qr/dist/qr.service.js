"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.QrService = void 0;
var common_1 = require("@nestjs/common");
var index_1 = require("@day-drive/user-sdk/lib/cjs/index");
var mongoose_1 = require("mongoose");
var type_enum_1 = require("./enums/type.enum");
var QrService = /** @class */ (function () {
    function QrService(qrDbRepository, jwtService, adminDbRepository, tokenService) {
        this.qrDbRepository = qrDbRepository;
        this.jwtService = jwtService;
        this.adminDbRepository = adminDbRepository;
        this.tokenService = tokenService;
    }
    QrService.prototype.handleGenerateQr = function (token, serviceId) {
        return __awaiter(this, void 0, Promise, function () {
            var admin, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminDbRepository.findByCockpitId(serviceId)];
                    case 1:
                        admin = _a.sent();
                        if (!admin) {
                            throw new common_1.HttpException('Company not found', common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, index_1.verifyUser('https://stage.daydrive.net/api/profile', 'b3438d429eb95e919beea64a56c14bae', token)];
                    case 2:
                        id = (_a.sent()).id;
                        return [4 /*yield*/, this.qrDbRepository.create(admin.id, id, type_enum_1.Type.OPEN)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.jwtService.signAsync({ user: id, admin: admin.id }, { secret: 'new secret' })];
                }
            });
        });
    };
    QrService.prototype.handleScanQr = function (token, qr) {
        return __awaiter(this, void 0, Promise, function () {
            var admin, _a, company, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.tokenService.verifyToken(token)];
                    case 1:
                        admin = _b.sent();
                        _a = this.jwtService.verify(qr, {
                            secret: 'new secret'
                        }), company = _a.admin, user = _a.user;
                        if (admin !== company) {
                            throw new common_1.HttpException('You doesn\'t belongs to this company', common_1.HttpStatus.FORBIDDEN);
                        }
                        return [4 /*yield*/, this.qrDbRepository.create(new mongoose_1.Types.ObjectId(admin), user, type_enum_1.Type.SCAN)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    QrService = __decorate([
        common_1.Injectable()
    ], QrService);
    return QrService;
}());
exports.QrService = QrService;
