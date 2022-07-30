import 'react-native-get-random-values'; // if not imported causes crypto.getRandomValues() not supported error
import {v4 as uuidv4} from 'uuid';

export default function uuid(): string {
    return uuidv4();
}