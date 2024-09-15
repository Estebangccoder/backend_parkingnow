import { PartialType } from '@nestjs/swagger';
import { CreatePropertyDto } from './create-properties.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {

}
