import 'reflect-metadata';
import "./root.ioc";
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';

const container = new Container();
container.load(buildProviderModule());

export default container;
