import { makeStyles } from '@rneui/themed';

export default makeStyles(
  (
    theme,
    { voteCount, myVoting }: { voteCount: number; myVoting: boolean },
  ) => {
    const hasVotes = voteCount !== 0;
    const userVotingColor = myVoting
      ? theme.colors.primary
      : theme.colors.secondary;
    const voteMemberCountcolor = hasVotes ? userVotingColor : undefined;

    return {
      display: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      totalMember: {
        alignItems: 'flex-end',
      },
      voteMemberCount: {
        color: voteMemberCountcolor,
      },
    };
  },
);
