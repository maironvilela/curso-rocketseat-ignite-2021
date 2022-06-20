import { container } from "tsyringe";

import DayjsDateProvider from "./implementations/DayjsDateProvider";
import IDateProviders from "./models/IDateProviders";

container.registerSingleton<IDateProviders>("DateProvider", DayjsDateProvider);
