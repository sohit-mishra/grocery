import { CreateSubscriptionsDto} from './create-subscription.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateSubscriptionsDto extends PartialType(CreateSubscriptionsDto){}