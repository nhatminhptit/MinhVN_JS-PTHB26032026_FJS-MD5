import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Email')
export class EmailScalar implements CustomScalar<string, string> {
  description = 'Email custom scalar type';

  parseValue(value: any): string {
    if (typeof value !== 'string' || !value.includes('@')) {
      throw new Error('Invalid email format');
    }
    return value;
  }

  serialize(value: any): string {
    return value;
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING) {
      if (!ast.value.includes('@')) {
        throw new Error('Invalid email format');
      }
      return ast.value;
    }
    throw new Error('Invalid email format');
  }
}
