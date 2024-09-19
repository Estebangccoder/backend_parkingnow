import { Inject, Injectable, HttpException } from "@nestjs/common";
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';


@Injectable()
export class CacheManager{
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}

    async getFromCache(key: string, message: string){
        try {
            return await this.cacheManager.get(key)
        } catch (error) {
            throw new HttpException(
                error.message || message,
                error.status || 500
              );
        }
    }

    async setToCache(key: string, value: any, ttl: number, message: string){
        try {
            return await this.cacheManager.set(key, value, ttl);
        } catch (error) {
            throw new HttpException(
                error.message || message,
                error.status || 500
              );
        }
    }

    async removeFromCache(key: string){
        try {
            return await this.cacheManager.del(key);
        } catch (error) {
            throw new HttpException(
                error.message || "Error removing the value from cache ",
                error.status || 500
              );
        }
    }

    async clearCache(key: string){
        try {
            return await this.cacheManager.reset();
        } catch (error) {
            throw new HttpException(
                error.message || "Error cleaning cache ",
                error.status || 500
              );
        }
    }
}