import { Observable } from "rxjs";

import { GitAction } from "./../action/git";
import { HttpService } from "./../../service/httpService";

class GitEpic {

    getUserData = (action$) =>
        action$.ofType(GitAction.GetDataFromUrl)
            .switchMap(({ payload }) => {
                return HttpService.get('https://api.github.com/users/uqutub')
                    .switchMap(({ response }) => {
                        return Observable.of({
                            type: GitAction.GetDataFromUrl_SUCCESS,
                            payload: response
                        });
                    });
            })

}
export let gitEpic = new GitEpic();
