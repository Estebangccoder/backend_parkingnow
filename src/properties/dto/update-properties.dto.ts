import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-properties.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {

}
