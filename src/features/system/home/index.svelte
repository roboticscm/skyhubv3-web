<script>
    import { BaseUrl } from "src/lib/constants";
    import { NotifyListener } from 'src/store/notify-listener';
    import { SJSON } from 'src/lib/sjson';
    import RouterView from "src/components/ui/router-view/index.svelte";
    import MainLayout from "src/components/layout/main-layout";
    import SearchBar from "src/components/search-bar/index.svelte";
    import BranchDropdown from "src/components/layout/branch-dropdown/index.svelte";
    import MainNavBar from "src/components/layout/main-nav-bar/index.svelte";
    import DepartmentDropdown from "src/components/layout/department-dropdown/index.svelte";
    import Notification from "src/components/layout/notification/index.svelte";
    import UserProfiles from "src/components/layout/user-profiles/index.svelte";
    import { SObject } from 'src/lib/sobject';

    const windowWidth = window.innerWidth;
    const SMALL_SCREEN_WIDTH = 768;

    const events = new EventSource(`${BaseUrl.SYSTEM}/notify`);
    let firstTimes = true;
    events.onmessage = (res) => { 
        if(!firstTimes) {
            const json = JSON.parse(res.data);
            NotifyListener.payload$.next(json);
        }
        firstTimes = false;
    }
    
</script>

<MainLayout>
    <section slot="header" class="layout-header layout-header-logged-in">
        <div class="layout-header__top">
            <div class="layout-header__top__left">
                <BranchDropdown />
                <div class="separator" />
                <DepartmentDropdown />
            </div>
            <div class="layout-header__top__center">
                <SearchBar id="mainSearchBarId" menuPath="intro" />
            </div>
            <div class="layout-header__top__right">
                <Notification />
                <UserProfiles />
            </div>
        </div>
        <nav class="layout-header__bottom">
            <MainNavBar />
        </nav>
    </section>

    <div
        slot="default"
        style="height: 100%; background: var(--bg-tertiary); overflow: auto;">
        <RouterView />
    </div>
</MainLayout>
