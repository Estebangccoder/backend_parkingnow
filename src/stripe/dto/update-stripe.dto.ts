import { PartialType } from '@nestjs/swagger';
import { CreateStripeDto } from './create-stripe.dto';

export class UpdateStripeDto extends PartialType(CreateStripeDto) {}
